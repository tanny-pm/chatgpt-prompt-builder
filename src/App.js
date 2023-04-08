import { Container, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

function App() {
  const [word, setWord] = useState("");
  const [language, setLanguage] = useState("");

  const hundleWordChange = (e) => {
    setWord(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const generatePrompt = () => {
    return `${word}を${language}に翻訳してください。`;
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="翻訳したい言葉"
            value={word}
            onChange={hundleWordChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="言語"
            value={language}
            onChange={handleLanguageChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>{generatePrompt()}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
