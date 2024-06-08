import React from 'react';
import Goal from './Goal';
import { GoalData, MatchData } from './types';

interface Props {
  data: MatchData;
  matchIndex: number;
  onEditGoal: (updatedGoal: GoalData, matchIndex: number, goalIndex: number) => void;
  onDeleteGoal: (matchIndex: number, goalIndex: number) => void;
  host: string;
  guest: string;
}

const Match: React.FC<Props> = ({ data, matchIndex, onEditGoal, onDeleteGoal, host, guest }) => {
  return (
    <>
      {data.Goals.map((g, i) => (
        <Goal key={i} data={g} onEdit={onEditGoal} onDelete={onDeleteGoal} matchIndex={matchIndex} goalIndex={i} host={host} guest={guest} />
      ))}
    </>
  );
};

export default Match;
