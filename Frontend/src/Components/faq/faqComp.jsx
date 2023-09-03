import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { questions } from "../../utils/questions";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
} from "@mui/material";

import "./faqComp.css";

const FaqComp = () => {
  const [expandedPanel, setExpandedPanel] = useState(null);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : null);
  };

  return (
    <div id="faq-container">
      <Grid container spacing={2}>
        <Grid className="faq-left-section" item xs={12} sm={6}>
          <Typography variant="h4" className="faq-heading">
            Frequently Asked Questions
          </Typography>

          <div className="contact-link">
            <Typography variant="h5">
              <RouterLink to="/contact" className="contact-link-text">
                Reach out to us
              </RouterLink>
            </Typography>
          </div>
        </Grid>

        <Grid className="faQuestions" item xs={12} sm={6} md={6}>
          {questions.map((q) => (
            <Accordion
              key={q.id}
              className="question-card"
              expanded={expandedPanel === `panel-${q.id}`}
              onChange={handleAccordionChange(`panel-${q.id}`)}
            >
              <AccordionSummary>
                <Typography>{q.question}</Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Typography>{q.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default FaqComp;
