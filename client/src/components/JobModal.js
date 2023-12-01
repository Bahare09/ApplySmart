import React from "react";
import "./JobModal.css";
import { Modal, Button } from "antd";
function JobModal({ isOpen, onClose, fullJobDescription, handleOk }) {
  const renderJobDescription = () => {
    if (!fullJobDescription) {
      return <p>No job description available.</p>;
    }

    return < Modal
      open={isOpen}
      title="Quick view"
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Close
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Tailor CV for this job
        </Button>
      ]}

    >
      {fullJobDescription.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
    </Modal>
  };

  return (
    renderJobDescription()
  );
}
export default JobModal;
