import React, {useState} from "react";
import "./Chessboard.css"; // CSS 파일 임포트

const rowAxis = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8"
];
const columnAxis = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h"
];

export default function Chessboard() {
    const [queenPositions, setQueenPositions] = useState([]); // 퀸들의 위치를 저장하는 상태
    const [forbiddenTiles, setForbiddenTiles] = useState([]); // 배치 불가능한 타일들을 저장하는 상태
    const [countofQueen, setCountofQueen] = useState(0);

    function isSafe(row, col) {
        return !forbiddenTiles.some(tile => tile.row === row && tile.col === col);
    }

    function markForbiddenTiles(row, col) {
        const forbiddenTiles = [];
        for (let i = 0; i < 8; i++) {
            forbiddenTiles.push({row: rowAxis[row], col: columnAxis[i]}); // 행
            forbiddenTiles.push({row: rowAxis[i], col: columnAxis[col]}); // 열
            if (row + i < 8 && col + i < 8) 
                forbiddenTiles.push({
                    row: rowAxis[row + i],
                    col: columnAxis[col + i]
                }); // 대각선
            if (row - i >= 0 && col - i >= 0) 
                forbiddenTiles.push({
                    row: rowAxis[row - i],
                    col: columnAxis[col - i]
                }); // 대각선
            if (row + i < 8 && col - i >= 0) 
                forbiddenTiles.push({
                    row: rowAxis[row + i],
                    col: columnAxis[col - i]
                }); // 대각선
            if (row - i >= 0 && col + i < 8) 
                forbiddenTiles.push({
                    row: rowAxis[row - i],
                    col: columnAxis[col + i]
                }); // 대각선
            }
        setForbiddenTiles(prev => [
            ...prev,
            ...forbiddenTiles
        ]);
    }

    function onChessQueen(row, col) {
        const rowIndex = rowAxis.indexOf(row);
        const colIndex = columnAxis.indexOf(col);

        if (!isSafe(rowIndex, colIndex)) 
            return;
        
        setQueenPositions(prev => [
            ...prev, {
                row,
                col
            }
        ]);
        markForbiddenTiles(rowIndex, colIndex);
        setCountofQueen(prev => prev + 1);
    }

    let board = [];

    for (let i = columnAxis.length - 1; i >= 0; i--) {
        for (let j = 0; j < rowAxis.length; j++) {
            const number = j + i + 2;
            const isWhiteTile = number % 2 === 0;
            const row = rowAxis[j];
            const col = columnAxis[i];

            const isQueenHere = queenPositions.some(
                position => position.row === row && position.col === col
            );
            const isForbiddenHere = forbiddenTiles.some(
                tile => tile.row === row && tile.col === col
            );

            board.push(
                <div key={`${row}-${col}`}
                    // 각 타일에 고유한 키 추가
                    className={`tile ${isWhiteTile
                        ? "white-tile"
                        : "black-tile"} ${isForbiddenHere
                            ? "forbidden-tile"
                            : ""}`} onClick={() => onChessQueen(row, col)}>
                    {isQueenHere && <img src="images/queen_w.png" alt="Queen" className="queen"/>}
                </div>
            );
        }
    }

    let message = "";
    if (countofQueen === 8) {
        message = "성공! 모든 퀸이 배치되었습니다.";
    } else if (countofQueen > 0 && countofQueen < 8) {
        message = "현재 배치된 퀸의 개수는 " + countofQueen + " 입니다. " + (
            8 - countofQueen
        ) + "개의 퀸이 더 배치되어야합니다. ";
    }

    return (
        <div>
            <div id="chessboard">{board}</div>
            <div className="message">{message}</div>
        </div>
    );
}
