import FileCopyIcon from "@mui/icons-material/FileCopy";
import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

function App() {
  const defaultTemplate = "{翻訳したい言葉}を{言語}に翻訳してください";
  const defaultDelimiter = "{}";

  const [template, setTemplate] = useState(defaultTemplate);
  const [variableDelimiter, setVariableDelimiter] = useState(defaultDelimiter);
  const [variables, setVariables] = useState([]);
  const [variableValues, setVariableValues] = useState({});

  const handleTemplateChange = (e) => {
    setTemplate(e.target.value);
    extractVariables(e.target.value, variableDelimiter);
  };

  const handleDelimiterChange = (event) => {
    setVariableDelimiter(event.target.value);
    extractVariables(template, event.target.value);
  };

  const extractVariables = (inputTemplate, delimiter) => {
    if (delimiter.length < 2) {
      setVariables([]);
      return;
    }

    const regexStr = `${delimiter.charAt(0)}(.*?)${delimiter.charAt(1)}`;
    const regex = new RegExp(regexStr, "g");
    const extractedVariables = [];
    let match;

    while ((match = regex.exec(inputTemplate)) !== null) {
      extractedVariables.push(match[1]);
    }

    setVariables([...new Set(extractedVariables)]);
  };

  const handleVariableCahange = (variable, value) => {
    setVariableValues({ ...variableValues, [variable]: value });
  };

  const renderVariableFields = () => {
    return variables.map((variable) => (
      <Grid item xs={12} key={variable}>
        <TextField
          label={variable}
          value={variableValues[variable] || ""}
          onChange={(e) => handleVariableCahange(variable, e.target.value)}
        />
      </Grid>
    ));
  };

  const generatePrompt = () => {
    let result = template;

    for (const variable of variables) {
      const value = variableValues[variable] || variable;
      result = result.replace(
        `${variableDelimiter.charAt(0)}${variable}${variableDelimiter.charAt(
          1
        )}`,
        value
      );
    }

    return result;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatePrompt()).then(
      () => {
        console.log("Copied to clipboard!", generatePrompt());
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  };

  // デフォルトのテンプレートを読み込んだときに変数を抽出する
  useEffect(() => {
    extractVariables(defaultTemplate, defaultDelimiter);
  }, []);

  return (
    <Container>
      <Box mt={3} mb={3}>
        <Typography variant="h3" gutterBottom>
          ChatGPT Prompt Builder
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Template Input</Typography>
          <Box mt={1}>
            <TextField
              label="テンプレート"
              value={template}
              onChange={handleTemplateChange}
              fullWidth
              multiline
              rows={6}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Separater Input</Typography>
          <Box mt={1}>
            <TextField
              label="セパレーター"
              value={variableDelimiter}
              onChange={handleDelimiterChange}
              fullWidth
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5">Variable Input</Typography>
        </Grid>
        {renderVariableFields()}

        <Grid item xs={12}>
          <Divider sx={{ marginY: 8 }} />
          <Typography variant="h5">Generated Prompt</Typography>
          <Box mt={1} mb={10} display="flex" alignItems="center">
            <TextField
              label="プロンプト"
              value={generatePrompt()}
              fullWidth
              multiline
              rows={6}
            />{" "}
            <IconButton
              onClick={copyToClipboard}
              color="primary"
              aria-label="copy to clipboard"
            >
              <FileCopyIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
