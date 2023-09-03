//Author - Aadith Shameel B00929852
import { Grid, Container, Typography, Box } from "@mui/material";
import "./earnMoreComp.css";


function EarnMoreComp() {


  return (
    <div className="earnMoreComp">
      <Container className="earnMoreContainer">

        <Box className="heading">
          <Typography variant="h2" component="h2">
            Mentors <strong>make more money</strong> using Learnly
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                <Container className="discount">
                  <Typography variant="h4" component="h3">
                    Entice with <strong>Discounts</strong>
                  </Typography>
                </Container>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                <Container className="testimonials">
                  <Typography variant="h4" component="h3">
                    Select and showcase <strong>reviews</strong>
                  </Typography>
                </Container>
              </Grid>
            </Grid>

            <br />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                <Container className="pay-wish">
                  <Typography variant="h4" component="h3">
                    Set <strong>your own</strong> prices
                  </Typography>
                </Container>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                <Container className="smart-automations">
                  <Typography variant="h3" component="h3">
                    <strong>25%</strong>
                  </Typography>
                  <br />
                  <Typography variant="h4" component="h3">
                    more clients compared to other platforms
                  </Typography>
                </Container>
              </Grid>
            </Grid>

          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
            <Container className="revenue-sharing">
              <Typography variant="h3" component="h3">
                <strong>2x</strong>
              </Typography>
              <br />
              <Typography variant="h4" component="h3">
                your earnings with our revenue-sharing program
              </Typography>
            </Container>
          </Grid>

        </Grid>
      </Container>
    </div>
  );
}

export default EarnMoreComp;
