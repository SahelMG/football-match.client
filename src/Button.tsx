import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

interface MyButtonProps {
  variant: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export class MyButton extends React.Component<MyButtonProps> {
  render() {
    const { variant, children, onClick } = this.props;
    return (
      <button style={{ fontFamily: 'Sahel' }} className={`btn btn-${variant}`} onClick={onClick}>{children}</button>
    );
  }
}


function goToSpecificURL() {
  window.location.href = "آدرس URL مورد نظر";
}

ReactDOM.render(
  <div>
    <MyButton variant="primary"  onClick={goToSpecificURL}>ذخیره</MyButton>
  </div>,
  document.getElementById('root')
);
