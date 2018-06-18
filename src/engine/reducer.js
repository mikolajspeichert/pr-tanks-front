import { combineReducers } from 'redux-immutable'
import { createReducer } from 'redux-create-reducer'
import { fromJS, Map } from 'immutable'
import { save, get, keys } from '/src/services/storage'
import { actions } from './actions'

const initialPlayer = fromJS({
  id: 0,
  hullDir: 225,
  dead: false,
  movVal: 0.0,
  turretDir: 225,
  x: 3190,
  y: 430,
  health: 100,
  isFiring: false,
  lastHitBy: '',
})

const initialBoom = fromJS([])

const initialOpponents = fromJS({
  '1': {
    hullDir: 0,
    movVal: 0.0,
    turretDir: 0,
    x: 0,
    y: 0,
    health: 100,
    isFiring: false,
  },
  '2': {
    hullDir: 0,
    movVal: 0.0,
    turretDir: 0,
    x: 0,
    y: 0,
    health: 100,
    isFiring: false,
  },
  '3': {
    hullDir: 0,
    movVal: 0.0,
    turretDir: 0,
    x: 0,
    y: 0,
    health: 100,
    isFiring: false,
  },
})

const createInitialSettings = () => {
  const host = get(keys.host) || 'localhost'
  const port = get(keys.port) || '3000'
  return fromJS({
    host,
    port,
    stats: {
      0: {
        kills: 0,
        deaths: 0,
      },
      1: {
        kills: 0,
        deaths: 0,
      },
      2: {
        kills: 0,
        deaths: 0,
      },
      3: {
        kills: 0,
        deaths: 0,
      },
    },
  })
}

const player = createReducer(initialPlayer, {
  [actions.INIT_PLAYER](state, action) {
    return state.merge(fromJS(action.payload))
  },
  [actions.PLAYER_UPDATE](state, { payload }) {
    const { x, y, dir } = payload
    return state.merge(
      Map({
        x,
        y,
        hullDir: dir,
      })
    )
  },
  [actions.PLAYER_UPDATE_MOV](state, { payload }) {
    return state.set('movVal', payload.val)
  },
  [actions.PLAYER_UPDATE_POS](state, { payload }) {
    return state.set('x', payload.x).set('y', payload.y)
  },
  [actions.PLAYER_UPDATE_TURRET](state, { payload }) {
    return state.set('turretDir', payload.dir)
  },
  [actions.HIT](state, { payload }) {
    const { id } = payload
    const myId = state.get('id')
    const health = state.get('health')
    if (myId === id) {
      return state.merge(
        fromJS({
          health: health - 10,
          lastHitBy: payload.shooterId,
        })
      )
    }
    return state
  },
  [actions.DEATH](state) {
    return state.set('dead', true)
  },
})

const opponents = createReducer(initialOpponents, {
  [actions.INIT_OPPONENT](state, action) {
    return state.merge(fromJS({ [action.payload.id]: action.payload }))
  },
  [actions.OPPONENT_UPDATE](state, { payload }) {
    const { id, x, y, dir } = payload
    return state.mergeDeep(
      Map({
        [id]: Map({
          x,
          y,
          hullDir: dir,
        }),
      })
    )
  },
  [actions.OPPONENT_MOVEMENT](state, { payload }) {
    const { id, val } = payload
    return state.setIn([id, 'movVal'], val)
  },
  [actions.OPPONENT_POS](state, { payload }) {
    const { id, x, y } = payload
    return state.setIn([id, 'x'], x).setIn([id, 'y'], y)
  },
  [actions.OPPONENT_TURRET](state, { payload }) {
    const { id, dir } = payload
    return state.setIn([id, 'turretDir'], dir)
  },
  [actions.OPPONENT_SHOT](state, { payload }) {
    const { id, value } = payload
    return state.setIn([id, 'isFiring'], value)
  },
  [actions.HIT](state, { payload }) {
    const { id } = payload
    const health = state.getIn([id, 'health'])
    if (health) {
      return state.setIn([id, 'health'], health - 10)
    }
    return state
  },
})

const boom = createReducer(initialBoom, {
  [actions.HIT](state, { payload }) {
    const { x, y, deg } = payload
    return state.push(
      Map({
        x,
        y,
        deg,
      })
    )
  },
  [actions.HIT_END](state) {
    return state.shift()
  },
})

const settings = createReducer(createInitialSettings(), {
  [actions.SETTINGS_HOST](state, { payload }) {
    save(keys.host, payload.host)
    save(keys.port, payload.port)
    return state.merge({ ...payload })
  },
  [actions.SETTINGS_STATS](state, { payload }) {
    return state.mergeIn(['stats'], fromJS(payload))
  },
})

export default combineReducers({ player, opponents, boom, settings })

// MIN X: 400
// MIN Y: 430
// MAX Y: 2540
// MAX X: 3190
// state:
// {
//    player: {
//      id: 1,
//      hullDir: 114 *deg*
//      movVal: 2.3 *range 0:3*
//      posX: 40,
//      posY: 104,
//      health: 100, *range 0:100*
//      turretDir: 12 *deg*
//    }
//    opponents: {
//      1: {
//        ...player
//      }

// shot: {
// x: 3
// y: 234
// direction: 23 *deg*
// }
