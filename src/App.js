import React, { Component } from 'react';
import './App.css';
import Article from './Article';
import {Actions} from './actions';
import {taskStore, logStore, dataStore} from './stores';


class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            taskId:taskStore.taskNum,
            articleId:taskStore.articleNum,
            taskList:dataStore.taskList
        };

        taskStore.onChange2 = () => {
            if (taskStore.taskNum === this.state.taskList.length) {
                this.setState({
                    taskId: this.state.taskId - 1
                })
            }else {
                this.setState({
                    taskId: taskStore.taskNum,
                    articleId: taskStore.articleNum
                })
            }
        };

        dataStore.onChange = () => {
            this.setState({
                taskList: dataStore.taskList
            })
            console.log(dataStore.taskList)
        };
    }

  componentWillMount(){
   // this._getArticles();
  }

  render() {

      if (!this.state.taskList){
          return <div className='App'>
              Loading Task </div>
      }

    return (
        <div className="App" >
        {this.state.taskList[this.state.taskId].articleList.map((article, index) =>
            <Article
                taskId={this.state.taskId}
                title={article.title}
                thumbnail={article.thumbnail}
                date={article.date}
                paragraph = {article.paragraph}
                content={article.content}
                articleId={index}
            />
            )
        }
        </div>
    );
  }
}

export default App;

