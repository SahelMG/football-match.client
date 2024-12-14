import React, { useState } from 'react';
import { Button, Modal, Table, Form } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Match from './Match';
import { GoalData, MatchData } from './types';
import { MyButton } from './Button';

interface Props {
  matchesData: MatchData[];
}
673aec799b8da49a21ebe415949b1f9dd482ba094bfd3afed9cad91bb18800b097a27fb8ee6cc5d1fd4a3cda9caaaef08630e5044d0fff28edc5ed00f22b0469a73ad8c7d8d86f9efe8b4e53
https://webprog.io/course/%D8%A2%D9%85%D9%88%D8%B2%D8%B4-%D8%B1%D8%A7%DB%8C%DA%AF%D8%A7%D9%86-%DA%AF%DB%8C%D8%AA-%D9%88-%DA%AF%DB%8C%D8%AA-%D9%87%D8%A7%D8%A8-git-github/episode/40
const Football: React.FC<Props> = ({ matchesData }) => {
  const [league, setLeague] = useState<MatchData[]>(Array.isArray(matchesData) ? matchesData : []);
  const [show, setShow] = useState(false);
  const [host, setHost] = useState('');
  const [guest, setGuest] = useState('');
  const [goals, setGoals] = useState<GoalData[]>([]);
  const [editedMatchIndex, setEditedMatchIndex] = useState<number | null>(null);
  const [editedMatch, setEditedMatch] = useState<MatchData | null>(null);

  const handleAdd = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setHost('');
    setGuest('');
    setGoals([]);
  };

  const calculateGoals = (match: MatchData, team: string): number => {
    return match.Goals.filter(goal => goal.Team === team).length;
  };

  const handleSubmit = () => {
    const newMatch: MatchData = {
      Host: host,
      Guest: guest,
      Goals: goals
    };
    const updatedLeague = [...league.filter((_, index) => index !== editedMatchIndex), newMatch];
    setLeague(updatedLeague);
    handleClose();
  };

  const handleEditMatch = (matchIndex: number) => {
    const matchToUpdate = league[matchIndex];
    const editedMatch = {
      Host: matchToUpdate.Host,
      Guest: matchToUpdate.Guest,
      Goals: [...matchToUpdate.Goals]
    };
    setHost(matchToUpdate.Host);
    setGuest(matchToUpdate.Guest);
    setGoals(matchToUpdate.Goals);
    setEditedMatch(editedMatch);
    setEditedMatchIndex(matchIndex);
    setShow(true);
  };

  const handleGoalTimeChange = (value: string, index: number) => {
    const newGoals = [...goals];
    newGoals[index].Time = parseInt(value);
    setGoals(newGoals);
  };

  const handleGoalPlayerChange = (value: string, index: number) => {
    const newGoals = [...goals];
    newGoals[index].Player = value;
    setGoals(newGoals);
  };

  const handleGoalTeamChange = (value: string, index: number) => {
    const newGoals = [...goals];
    newGoals[index].Team = value;
    setGoals(newGoals);
  };

  const handleAddGoal = () => {
    setGoals([...goals, { Time: 0, Player: '', Team: '' }]);
  };

  const handleEditGoal = (updatedGoal: GoalData, matchIndex: number, goalIndex: number) => {
    const updatedLeague = [...league];
    updatedLeague[matchIndex].Goals[goalIndex] = updatedGoal;
    setLeague(updatedLeague);
  };

  const handleDeleteGoal = (matchIndex: number, goalIndex: number) => {
    const updatedLeague = [...league];
    updatedLeague[matchIndex].Goals.splice(goalIndex, 1);
    setLeague(updatedLeague);
  };

  return (
    <>
      <Button variant="primary" onClick={handleAdd}>اضافه کردن مسابقه</Button>
      <ToastContainer />
      {league.map((m, i) => (
        <div key={i} style={{ margin: "10px" }}>
          <h3>{m.Host} ({calculateGoals(m, m.Host)}) - {m.Guest} ({calculateGoals(m, m.Guest)})</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th></th>
                <th>زمان</th>
                <th>بازیکن</th>
                <th>تیم</th>
              </tr>
            </thead>
            <tbody>
              <Match data={m} matchIndex={i} onEditGoal={handleEditGoal} onDeleteGoal={handleDeleteGoal} host={m.Host} guest={m.Guest} />
            </tbody>
          </Table>
          <Button variant="info" onClick={() => handleEditMatch(i)}>ویرایش کلی</Button>
        </div>
      ))}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>اضافه کردن مسابقه</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formHost">
              <Form.Label>تیم میزبان</Form.Label>
              <Form.Control type="text" placeholder="تیم میزبان" value={host} onChange={(e) => setHost(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formGuest">
              <Form.Label>تیم مهمان</Form.Label>
              <Form.Control type="text" placeholder="تیم مهمان" value={guest} onChange={(e) => setGuest(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formGoals">
              <Form.Label></Form.Label>
              {goals.map((goal, index) => (
                <div key={index}>
                  <Form.Group controlId={`formTime_${index}`}>
                    <Form.Label>زمان گل</Form.Label>
                    <Form.Control type="number" placeholder="زمان" value={goal.Time} onChange={(e) => handleGoalTimeChange(e.target.value, index)} />
                  </Form.Group>
                  <Form.Group controlId={`formPlayer_${index}`}>
                    <Form.Label>بازیکن</Form.Label>
                    <Form.Control type="text" placeholder="بازیکن" value={goal.Player} onChange={(e) => handleGoalPlayerChange(e.target.value, index)} />
                  </Form.Group>
                  <Form.Group controlId={`formTeam_${index}`}>
                    <Form.Label>تیم</Form.Label>
                    <Form.Control as="select" value={goal.Team} onChange={(e) => handleGoalTeamChange(e.target.value, index)}>
                      <option value={host}>{host}</option>
                      <option value={guest}>{guest}</option>
                    </Form.Control>
                  </Form.Group>
                </div>
              ))}
              <Button variant="primary" onClick={handleAddGoal} style={{ marginBottom: '10px', marginTop: '10px' }}>افزودن گل</Button>
            </Form.Group>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>زمان</th>
                  <th>بازیکن</th>
                  <th>تیم</th>
                </tr>
              </thead>
              <tbody>
                {goals.map((goal, index) => (
                  <tr key={index}>
                    <td>{goal.Time}</td>
                    <td>{goal.Player}</td>
                    <td>{goal.Team}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
         
            <MyButton variant='primary' onClick={handleSubmit} children="ذخیره" />

          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Football;

