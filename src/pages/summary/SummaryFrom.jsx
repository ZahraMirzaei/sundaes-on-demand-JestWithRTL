import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Popover, PopoverBody } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const SummaryFrom = () => {
  const [tcChecked, setTcChecked] = useState(false);

  const popover = (
    <Popover id="popover">
      <PopoverBody>No ice cream will actually be delivered</PopoverBody>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={tcChecked}
          onChange={(e) => setTcChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        disabled={tcChecked ? !tcChecked : true}
      >
        Confirm order
      </Button>
    </Form>
  );
};

export default SummaryFrom;
