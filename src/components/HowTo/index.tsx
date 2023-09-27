import React from "react";
import "./styles.css";
import { Tooltip } from "..";

const HowTo = () => {
  return (
    <div className="howto-wrapper">
      <h1>Search Engine 101</h1>
      <ul>
        <li>This engine search for any text in cards, in all properties</li>
        <li>
          You can search specifically about something typing c:COLOR for
          searches without spaces or a:"CARD NAME" to searches with spaces
        </li>
        <li>
          Before the colon you put the property code and after you put what you
          want to search
        </li>
      </ul>
      <table className="code-description-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>s</td>
            <td>Set</td>
          </tr>
          <tr>
            <td>n</td>
            <td>Number</td>
          </tr>
          <tr>
            <td>c</td>
            <td>Color</td>
          </tr>
          <tr>
            <td>t</td>
            <td className="tooltip">
              Category
              <Tooltip>Leader, Stage, Event, Character</Tooltip>
            </td>
          </tr>
          <tr>
            <td>e</td>
            <td>Effects</td>
          </tr>
          <tr>
            <td>a</td>
            <td>Name</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HowTo;
