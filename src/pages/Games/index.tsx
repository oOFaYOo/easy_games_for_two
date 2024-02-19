import React from "react";
import {CircularProgress} from "@mui/material";
import Tile from "../../components/Tile";

const Games = () => {

    return (
        <div className={'w-full flex flex-col grow justify-center items-center'}>
            {/*{*/}
            {/*    data*/}
            {/*        ?*/}
                    <div
                        className={'w-[90%] p-4 h-[500px] styled_scrollbar overflow-y-auto relative flex flex-wrap gap-4 justify-between'}>
                        {/*{data.map((item, i) => */}
                            <Tile id={'123'} game={'TicTacToe'}/>
                        {/*)}*/}
                    </div>
            {/*        : <CircularProgress/>*/}
            {/*}*/}
        </div>
    )
}

export default Games;