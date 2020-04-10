import React from "react";
import HomePresenter from "./HomePresenter";
import { moviesApi } from "api";

export default class extends React.Component{
    state = {
        nowPlaying: null,
        upcoming:null,
        popular:null,
        error: null,
        loading: true
    };

    async componentDidMount(){
        try{
            const {data:{results: nowPlaying}} = await moviesApi.nowPlaying();
            //data 안의 results에 접근하고(앞 :) 그 내용을 nowPlaying이라는 이름으로 명명(뒤 :)한다
            const {data:{results : upcoming}} = await moviesApi.upcoming();

            const {data:{results : popular}} = await moviesApi.popular();

            //nowPlaying=nowPlaying 이렇게 명명할 변수와 입력할 변수 이름이 같으면 한번만 쓰면된다.
            this.setState({
                nowPlaying, 
                upcoming, 
                popular
            })
        } catch{
            this.setState({
                error:"Can't find movies information."
            });
        } finally{
            this.setState({
                loading: false
            });
        }
    }



    render() {
        const { nowPlaying, upcoming, popular, error, loading } = this.state;
        console.log(this.state);
        return (
            <HomePresenter nowPlaying={nowPlaying}
                upcoming={upcoming}
                popular={popular}
                error ={error}
                loading={loading}
            />
        )
           
    }
}