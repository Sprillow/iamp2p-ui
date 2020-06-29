import { RELATION_AS_PARENT, resetEdgeConnector } from './actions'
import { createEdge } from '../projects/edges/actions'

export default function handleEdgeConnectMouseUp(
  fromAddress,
  relation,
  toAddress,
  activeProject,
  dispatch
) {
  if (fromAddress && toAddress) {
    const fromAsParent = relation === RELATION_AS_PARENT
    const createEdgeAction = createEdge(activeProject).create({
      edge: {
        parent_address: fromAsParent ? fromAddress : toAddress,
        child_address: fromAsParent ? toAddress : fromAddress,
      },
    })
    dispatch(createEdgeAction)
  }
  dispatch(resetEdgeConnector())
}
