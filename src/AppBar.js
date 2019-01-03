/**
 * Created by juyoung on 2018-08-23.
 */
import React, { Component } from 'react';
import './App.css';
import request from 'superagent';
import { Link, Redirect } from 'react-router-dom';
import {Actions} from './actions';
import {taskStore, logStore, dataStore} from './stores';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class MyAppBar extends Component {

    constructor(props){
        super(props);
        this.state = {
            taskList: null,
            taskId:taskStore.taskNum,
            articleId:taskStore.articleNum,
            detail:false,
            redirect:false,
            start:false,
            user:null
        };

        taskStore.onChange = () => {
            if (taskStore.taskNum === this.state.taskList .length) {
                this.setState({
                    taskId: this.state.taskId - 1
                })
            }else {
                this.setState({
                    taskId: taskStore.taskNum,
                    articleId: taskStore.articleNum
                })
            }

            if(this.state.taskId !== taskStore.taskNum){
                this.setState({
                    redirect:true
                })
            }
        };

        taskStore.loadDetail = () => {
            this.setState({
                detail: true,
            })
        };

        logStore.getResult = () => {
            var JSONdata = JSON.stringify(logStore, null, 4);
           /*
            var fs = require('jsonfile');

            fs.writeFile('result.json', JSONdata, 'utf8', function(err) {
                if (err) throw err;
                console.log('Complete')
            })

            localStorage.setItem('result', JSON.stringify(logStore));
            */
           console.log(JSONdata)
        }
    }

    componentWillMount () {
    //read JSON file
        request.get('./sizeList.json') //original : taskList.json
            .accept('application/json')
            .end((err, res) => {
                this.loadedJSON(err, res)
            })
    }

    loadedJSON (err, res) {
        if (err) {
            console.log('JSON을 읽어 들이는 동안 오류가 발생했습니다')
            return
        }
        this.setState({
            taskList: res.body
        })
        Actions.loadTask(res.body);
    }

    handleStart = () => {
        this.setState({start: true});
        Actions.startTask(this.state.user, performance.now());
    };

    handleHome = event => {
        this.setState({redirect:true})
    }

    handleTextfield = event => {
        this.setState({
            user: event.target.value
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            this.setState({redirect:false})
            return <Redirect to='/'/>
        }
    }

    renderDetail = () => {
        if (this.state.detail) {
            this.setState({detail:false})
            return <Redirect to='/detail'/>
        }
    }

    render(){
        const actionDialog = [
            <FlatButton
                label="Start"
                primary={true}
                onClick={this.handleStart}
            />,
        ];

        if (!this.state.taskList){
            return <div className='app-bar'>
                    </div>
        }

        return(
            <div className="app-bar">
                <Dialog
                    actions={actionDialog}
                    modal={false}
                    open={!this.state.start}
                    onRequestClose={this.handleStart}
                >
                    Start task!<br />
                    <TextField
                    value={this.state.user}
                    onChange={this.handleTextfield}
                    hintText="Type your ID"
                    errorText="본인의 아이디를 적어주세요"/>
                </Dialog>
                <AppBar position="static"
                    title={"Thumbnail Vis : Task "+(taskStore.taskNum+1)+" Article "+(taskStore.articleNum+1)}
                    onLeftIconButtonClick = {this.handleHome}
                >
                    <div className="Task__Q">{"Q : " + this.state.taskList[this.state.taskId].taskQ}</div>
                </AppBar>
                {this.renderRedirect()}
                {this.renderDetail()}
            </div>
        );
    }
}


export default MyAppBar;
