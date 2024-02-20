import React, {useEffect, useState} from "react";
import {CircularProgress} from "@mui/material";
import Tile from "../../components/Tile";
import api from "../../api_client"
import {AllGamesType} from "../../api_client/type";

const Games = () => {

    const [data, setData] = useState<AllGamesType | null>(null);

    useEffect(() => {
        (
            async () => {
                if (!data) {
                    let response = await api.getGames();
                    if (response.status === 200) {
                        setData(response.data)
                    } else {
                        console.log('Error.' + response.status)
                    }
                }
            }
        )()
    }, [])

    return (
        <div className={'w-full flex flex-col grow justify-center items-center'}>
            {
                data
                ?
                    <div
                        className={'w-[90%] p-4 h-[500px] styled_scrollbar overflow-y-auto ' +
                            'relative flex flex-wrap gap-4 justify-between'}>
                        {data.map((item, i) =>
                            <Tile key={i} id={item.id} game={item.type}/>
                        )}
                    </div>
                : <CircularProgress/>
            }
        </div>
    )
}

export default Games;