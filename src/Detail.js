/**
 * Created by juyoung on 2018-08-23.
 */
import React, { Component } from 'react';
import {Actions} from './actions';
import './Detail.css';
import { Link, Redirect } from 'react-router-dom';
import {taskStore, logStore, dataStore} from './stores';
import { ButtonToolbar, Button, Grid, Row, Col } from 'react-bootstrap';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import CheckButton from 'material-ui/svg-icons/navigation/check';
import BackButton from 'material-ui/svg-icons/navigation/arrow-back';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';


class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            taskId: taskStore.taskNum,
            articleId: taskStore.articleNum,
            redirect: false,
            done: false,
            taskList: dataStore.taskList
        }

        taskStore.onChange3 = () =>
        {
            this.setState({
                taskId: taskStore.taskNum,
                articleId: taskStore.articleNum
            })
        };

        dataStore.onChange2 = () => {
            this.setState({
                taskList: dataStore.taskList
            })
        };
    }

    handleClick = e => {
        if(e.currentTarget.id === "next-task"){
            if(this.state.taskId === this.state.taskList.length-1){
                Actions.finishTask(this.state.articleId, performance.now())
                this.setState({done:true})
            }
            else{
                Actions.nextTask(this.state.taskId+1, this.state.articleId, performance.now());
            }
        }
        else if(e.currentTarget.id === "back-list")
            this.setState({redirect:true})
    }

    handleClose = () => {
        this.setState({done: false});
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            this.setState({redirect:false})
            return <Redirect to='/'/>
        }
    }

    render(){
        const actionDialog = [
            <FlatButton
                label="Okay"
                primary={true}
                onClick={this.handleClose}
            />,
        ];

        if (!this.state.taskList){
            return <div className='article-detail'> </div>
        }

        const article = this.state.taskList[this.state.taskId].articleList[this.state.articleId]
        //var url = "./static/" + (this.state.taskId+1) + "/0.png"
        var url = article.thumbnail
        return (
            <div className='article-detail'>
            {this.renderRedirect()}
            <Grid>
            <div className="Button__Group">
                <FloatingActionButton className="Detail__Button" id="back-list" onClick={this.handleClick} label="Back to the Task list" >
                <BackButton />
                </FloatingActionButton>
                <FloatingActionButton className="Detail__Button" id="next-task" onClick={this.handleClick} label="Go to the Next task" >
                <CheckButton />
                </FloatingActionButton>
            </div>
            <h1>{article.title}</h1>
            <p className="Detail__Date">{article.date}</p>
            <div className="Thumbnail__Box">
                <img src={url}  className="Detail__Thumbnail" />
            </div>
            <h4>{this.state.taskList[this.state.taskId].articleList[this.state.articleId].content}</h4>
            </Grid>
            <Dialog
                actions={actionDialog}
                modal={false}
                open={this.state.done}
                onRequestClose={this.handleClose}
            >
            Task is Finished!
            </Dialog>
            </div>
        )
    }
}

export default Detail;