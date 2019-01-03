/**
 * Created by juyoung on 2018-08-23.
 */
import {ActionType} from './actions'
import {appDispatcher} from './appDispatcher'

export const taskStore = {taskNum:0,  articleNum:0, onChange:function(){}, onChange2:function(){}, onChange3:function(){}, loadDetail:function(){}}
export const logStore = {userId:null, clickedArticle:[[]], taskTime:[{}], answerList:[{}], getResult:function(){}}
export const dataStore = {taskList:null, onChange:function(){}, onChange2:function(){}}

appDispatcher.register(payload => {
    if(payload.actionType === ActionType.NEXT_TASK){
        logStore.taskTime[taskStore.taskNum].finish = payload.nextTime
        logStore.answerList[taskStore.taskNum].article = payload.articleNum
        logStore.answerList[taskStore.taskNum].time = logStore.taskTime[taskStore.taskNum].finish - logStore.taskTime[taskStore.taskNum].start
        taskStore.taskNum = payload.taskNum
        taskStore.articleNum = payload.articleNum
        logStore.answerList.push({})
        logStore.clickedArticle.push([])
        taskStore.onChange()
        taskStore.onChange2()
        taskStore.onChange3()
        logStore.taskTime.push({})
        logStore.taskTime[taskStore.taskNum].start = payload.nextTime
    }
    if(payload.actionType === ActionType.CLICK_ARTICLE){
        taskStore.articleNum = payload.articleNum
        logStore.clickedArticle[taskStore.taskNum].push({"article":payload.articleNum,"time":payload.clickTime})
        taskStore.loadDetail()
    }
    if(payload.actionType === ActionType.FINISH_TASK){
        logStore.taskTime[taskStore.taskNum].finish = payload.finishTime
        logStore.answerList[taskStore.taskNum].article = payload.articleNum
        logStore.answerList[taskStore.taskNum].time = logStore.taskTime[taskStore.taskNum].finish - logStore.taskTime[taskStore.taskNum].start
        logStore.getResult()
    }
    if(payload.actionType === ActionType.START_TASK){
        logStore.taskTime[taskStore.taskNum].start = payload.startTime
        logStore.userId = payload.user
    }
    if(payload.actionType === ActionType.LOAD_TASK){
        dataStore.taskList = payload.taskList
        dataStore.onChange()
        dataStore.onChange2()
    }
})

