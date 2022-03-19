import React from 'react';
import { Input } from '../components';

const Setup = ({ onChange }) => (
  <>
    <style>
      {`
      .grid-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        width: 70%;
        padding: 1rem;
      }
      .grid-item {
        text-align: center;
        margin: 0 auto;
        width: 100%;
      }
      .grid-item:nth-child(1) {
        grid-row: 1 / 2;
        grid-column: 1 / 4;
      }
      .grid-item:nth-child(2) {
        grid-row: 2 / 3;
        grid-column: 1 / 2;
      }
      .grid-item:nth-child(3) {
        grid-row: 2 / 3;
        grid-column: 2 / 3;
        padding: 1rem;
        margin: 1rem;
        text-align: center;
        font-size: 1.25rem;
      }
      .grid-item:nth-child(4) {
        grid-row: 2 / 3;
        grid-column: 3 / 4;
      }
      .grid-item:nth-child(5) {
        grid-row: 3 / 4;
        grid-column: 1 / 4;
        
    `}
    </style>
    <form onSubmit={e => e.preventDefault()} onChange={onChange}>

      <div className="grid-container">
        <div className="grid-item"><Input type="number" placeholder="Sets(5)" name="rounds" /></div>
        <div className="grid-item"><Input type="number" placeholder="Min" name="workMin" width="40%" /></div>
        <div className="grid-item"><p>To</p></div>
        <div className="grid-item"><Input type="number" placeholder="Max" name="workMax" /></div>
        <div className="grid-item"><Input type="number" placeholder="Rest (60%)" name="rest" /></div>
      </div>
    </form>
  </>
);

export { Setup };
