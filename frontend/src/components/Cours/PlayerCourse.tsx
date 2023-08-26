/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 21/08/2023 - 15:25:52
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 21/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/

import React from 'react';
import ReactPlayer from 'react-player';
 
function PlayerCourse() {
  return (
    <ReactPlayer
      url="<https://www.youtube.com/watch?v=IbJLWZaTcQs>"
      controls={false}  // Hide native player controls
    />
  );
}
export  default PlayerCourse