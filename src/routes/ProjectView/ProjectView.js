import React, { useEffect } from 'react'
import {
  Redirect,
  Route,
  Switch,
  useParams,
  useLocation,
} from 'react-router-dom'
import { connect } from 'react-redux'

import MapView from './MapView/MapView'
import PriorityView from './PriorityView/PriorityView'

// data
import { fetchProjectMeta } from '../../projects/project-meta/actions'
import { fetchEntryPoints } from '../../projects/entry-points/actions'
import { fetchMembers } from '../../projects/members/actions'
import { fetchGoals } from '../../projects/goals/actions'
import { fetchEdges } from '../../projects/edges/actions'
import { fetchGoalMembers } from '../../projects/goal-members/actions'
import { fetchGoalComments } from '../../projects/goal-comments/actions'
import { fetchGoalVotes } from '../../projects/goal-votes/actions'
// ui
import { setActiveEntryPoints } from '../../active-entry-points/actions'
import { setActiveProject } from '../../active-project/actions'
import { closeGoalForm } from '../../goal-form/actions'
import { unselectAll } from '../../selection/actions'
import { closeExpandedView } from '../../expanded-view/actions'
import { resetTranslateAndScale } from '../../viewport/actions'

function ProjectViewInner({
  projectId,
  entryPointAddresses,
  resetProjectView,
  setActiveProject,
  setActiveEntryPoints,
  fetchProjectMeta,
  fetchMembers,
  fetchEntryPoints,
  fetchGoals,
  fetchEdges,
  fetchGoalMembers,
  fetchGoalVotes,
  fetchGoalComments,
}) {
  useEffect(() => {
    // pushes this new projectId into the store/state
    setActiveProject(projectId)
    fetchProjectMeta()
    fetchMembers()
    fetchEntryPoints()
    fetchGoals()
    fetchEdges()
    fetchGoalMembers()
    fetchGoalVotes()
    fetchGoalComments()
    // this will get called to unmount the component
    return resetProjectView
  }, [projectId])

  useEffect(() => {
    setActiveEntryPoints(entryPointAddresses)
  }, [JSON.stringify(entryPointAddresses)])

  return (
    <Switch>
      <Route path='/project/:projectId/map' component={MapView} />
      <Route path='/project/:projectId/priority' component={PriorityView} />
      <Route exact path='/project/:projectId' component={ProjectRedirect} />
    </Switch>
  )
}

function ProjectRedirect() {
  const { projectId } = useParams()
  return <Redirect to={`/project/${projectId}/map`} />
}

function mapStateToProps(state, ownProps) {
  return {}
}

function mapDispatchToProps(dispatch, ownProps) {
  const { projectId } = ownProps
  return {
    setActiveProject: projectId => dispatch(setActiveProject(projectId)),
    setActiveEntryPoints: entryPointAddresses =>
      dispatch(setActiveEntryPoints(entryPointAddresses)),
    resetProjectView: () => {
      dispatch(closeExpandedView())
      dispatch(closeGoalForm())
      dispatch(unselectAll())
      dispatch(resetTranslateAndScale())
    },
    fetchProjectMeta: () =>
      dispatch(
        fetchProjectMeta.create({ cellIdString: projectId, payload: null })
      ),
    fetchEntryPoints: () =>
      dispatch(
        fetchEntryPoints.create({ cellIdString: projectId, payload: null })
      ),
    fetchMembers: () =>
      dispatch(fetchMembers.create({ cellIdString: projectId, payload: null })),
    fetchGoals: () =>
      dispatch(fetchGoals.create({ cellIdString: projectId, payload: null })),
    fetchEdges: () =>
      dispatch(fetchEdges.create({ cellIdString: projectId, payload: null })),
    fetchGoalMembers: () =>
      dispatch(
        fetchGoalMembers.create({ cellIdString: projectId, payload: null })
      ),
    fetchGoalVotes: () =>
      dispatch(
        fetchGoalVotes.create({ cellIdString: projectId, payload: null })
      ),
    fetchGoalComments: () =>
      dispatch(
        fetchGoalComments.create({ cellIdString: projectId, payload: null })
      ),
  }
}

const ProjectView = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectViewInner)

function ProjectViewWrapper() {
  const { projectId } = useParams()
  const location = useLocation()
  let entryPointAddresses = new URLSearchParams(location.search).get(
    'entryPoints'
  )
  if (entryPointAddresses) {
    entryPointAddresses = entryPointAddresses.split(',')
  } else {
    entryPointAddresses = []
  }
  return (
    <ProjectView
      projectId={projectId}
      entryPointAddresses={entryPointAddresses}
    />
  )
}

export default ProjectViewWrapper
