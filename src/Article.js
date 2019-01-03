/**
 * Created by juyoung on 2018-08-22.
 */
import React from 'react';
import './Article.css';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis'
import {Actions} from './actions';
import {taskStore} from './stores';
import { Link, Redirect } from 'react-router-dom';


function Article({taskId, title, thumbnail, date, paragraph, content, articleId}){

    const handleClick = e => {
        Actions.clickArticle(parseInt(e.currentTarget.id), performance.now());
    }

    return (
        <div className="Article" id={articleId} onClick={handleClick}>
            <div className="Article__Columns">
                <ArticleThumbnail taskId={taskId} articleId={articleId} thumbnail={thumbnail} alt={title} />
            </div>
            <div className="Article__Columns">
                <h1>{title}</h1>
                <div className="Article__Date">
                    <ArticleDate date={date} />
                </div>
                <div className="Article__Paragraph">
                <LinesEllipsis
                    text={paragraph}
                    maxLine='3'
                    ellipsis='...'
                    trimRight
                    basedOn='letters'
                />
                </div>
            </div>
        </div>
    )
}

function ArticleThumbnail({taskId, articleId, thumbnail, alt}){
    //var url = "./static/" + (taskId+1) + "/" + articleId + ".png"
    var url = thumbnail
    return (
            <img src={url} alt={alt} title={alt}  className="Article__Thumbnail" />
    )
}

function ArticleDate({date}){
    return (
        <span className="Article__Date">{date}</span>
    )
}

Article.propTypes = {
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    date: PropTypes.array.isRequired,
    paragraph: PropTypes.string.isRequired
}

ArticleThumbnail.propTypes = {
    thumbnail : PropTypes.string.isRequired,
    alt : PropTypes.string.isRequired
}

ArticleDate.propTypes = {
    date: PropTypes.string.isRequired
}

export default Article;
