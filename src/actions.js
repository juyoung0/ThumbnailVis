/**
 * Created by juyoung on 2018-08-23.
 */
import {appDispatcher} from './appDispatcher'

export const ActionType = {
    NEXT_TASK: 'NEXT_TASK',
    CLICK_ARTICLE: 'CLICK_ARTICLE',
    FINISH_TASK: 'FINISH_TASK',
    START_TASK: 'START_TASK',
    LOAD_TASK: 'LOAD_TASK'
}

export const Actions = {
    nextTask : (tasknum, articlenum, nexttime) => {
        appDispatcher.dispatch({
            actionType: ActionType.NEXT_TASK,
            taskNum: tasknum,
            articleNum: articlenum,
            nextTime: nexttime
        })
    },
    clickArticle : (articlenum, clicktime) => {
        appDispatcher.dispatch({
            actionType: ActionType.CLICK_ARTICLE,
            articleNum: articlenum,
            clickTime: clicktime
        })
    },
    finishTask : (articlenum, finishtime) => {
        appDispatcher.dispatch({
            actionType: ActionType.FINISH_TASK,
            articleNum: articlenum,
            finishTime: finishtime
        })
    },
    startTask : (user, starttime) => {
        appDispatcher.dispatch({
            actionType: ActionType.START_TASK,
            startTime: starttime,
            user: user
        })
    },
    loadTask : (tasklist) => {
        appDispatcher.dispatch({
            actionType: ActionType.LOAD_TASK,
            taskList: tasklist
        })
    }
}