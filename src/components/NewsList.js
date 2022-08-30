import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from "axios";


const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;


const NewsList = () =>{
    const [articles, setArticles] = useState(null);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setloading(true);
            try {
                const response = await axios.get(
                    'https://newsapi.org/v2/top-headlines?country=kr&category=sports&apiKey=a10c3ee23e384b8f98d483f593da0a80'
                );
                setArticles(response.data.articles);
            }catch(e){
                console.log(e);
            }
            setloading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return <NewsListBlock>대기 중...</NewsListBlock>;
    }
    if (!articles) {
        return null;
    }
  return (
        <NewsListBlock>
            {articles.map(article => (
                <NewsItem key={article.url} article={article} />
            ))}
        </NewsListBlock>
  );
}

export default NewsList;
