import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { FormControlElement } from './types';
import { MyButton } from './Button';
import { GoalData } from './types'; 

// Rest of your code


interface Props {
  data: GoalData;
  onEdit: (updatedGoal: GoalData, matchIndex: number, goalIndex: number) => void;
  onDelete: (matchIndex: number, goalIndex: number) => void;
  matchIndex: number;
  goalIndex: number;
  host: string;
  guest: string;
}

const Goal: React.FC<Props> = ({ data, onEdit, onDelete, matchIndex, goalIndex, host, guest }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedGoal, setEditedGoal] = useState<GoalData>({ ...data });

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);

  const handleSaveEdit = () => {
    onEdit(editedGoal, matchIndex, goalIndex);
    handleCloseEditModal();
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedGoal({ ...editedGoal, Time: parseInt(e.target.value) });
  };

  const handlePlayerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedGoal({ ...editedGoal, Player: e.target.value });
  };

  const handleTeamChange: React.ChangeEventHandler<FormControlElement> = (e) => {
    const value = e.target.value;
    setEditedGoal({ ...editedGoal, Team: value });
  };

  return (
    <tr>
      <td>
        <Button variant="link" style={{ textDecoration: 'none', color: 'red' }} onClick={handleShowEditModal}>
          ویرایش
        </Button>
        <Button variant="link" style={{ textDecoration: 'none', color: 'red' }} onClick={() => onDelete(matchIndex, goalIndex)}>
          حذف
        </Button>
        <Modal show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>ویرایش گل</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formTime">
                <Form.Label>زمان گل</Form.Label>
                <Form.Control type="number" value={editedGoal.Time.toString()} onChange={handleTimeChange} />
              </Form.Group>
              <Form.Group controlId="formPlayer">
                <Form.Label>بازیکن</Form.Label>
                <Form.Control type="text" value={editedGoal.Player} onChange={handlePlayerChange} />
              </Form.Group>
              <Form.Group controlId="formTeam">
                <Form.Label>تیم</Form.Label>
                <Form.Control as="select" value={editedGoal.Team} onChange={handleTeamChange}>
                  <option value={host}>{host}</option>
                  <option value={guest}>{guest}</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>لغو</Button>
            <MyButton variant='primary' onClick={handleSaveEdit} children="ذخیره" />
          </Modal.Footer>
        </Modal>
      </td>
      <td>{data.Time}</td>
      <td>{data.Player}</td>
      <td>{data.Team}</td>
    </tr>
  );
};

export default Goal;
