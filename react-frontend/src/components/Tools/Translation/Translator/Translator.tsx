import { Col, message, Row, Select, Input, Button, Space, Spin } from "antd";
import { useReducer, useState } from "react";
import { translate } from "../../../../Api/translate";
import { clearHistory, getHistory } from "../../../../Api/history";
import History from "../History";
const { Option } = Select;
const { TextArea } = Input;
const languages: Language[] = require("../../../../Data/languages.json");

const initialState: Translate = {
  to: "en",
  from: "en",
  text: "",
};
const translateReducer = (state: Translate, action: Action) => {
  switch (action.type) {
    case "text":
      debugger;
      return { ...state, text: action.payload };
    case "to":
      return { ...state, to: action.payload };
    case "from":
      return { ...state, from: action.payload };
    case "clear":
      return { to: "en", from: "en", text: "" };
    default:
      return state;
  }
};
const Translator = () => {
  const [translateState, dispatchTranslate] = useReducer(
    translateReducer,
    initialState
  );
  const [response, setResponse] = useState("");
  const [history, setHistory] = useState<Array<TranslationHistory>>([]);
  const [historyVisibility, setHistoryVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const onChange = (e: any) => {
    debugger;
    dispatchTranslate({ type: "text", payload: e.target.value });
  };
  const handleFromLanguageChange = (value: string) => {
    dispatchTranslate({ type: "from", payload: value });
  };
  const handleToLanguageChange = (value: string) => {
    dispatchTranslate({ type: "to", payload: value });
  };
  const handleTranslate = async () => {
    if (translateState.text === "") {
      message.error("Please fill the Input field");
      return;
    }
    if (translateState.from === translateState.to) {
      message.error(
        "From and To languages are same. Please try to change one of them"
      );
      return;
    }
    setIsLoading(true);
    await translate(translateState).then((res) => {
      setResponse(res);
      setIsLoading(false);
    });
  };
  const handleClear = async () => {
    dispatchTranslate({ type: "clear", payload: "" });
    setResponse("");
  };
  const handleHistory = async () => {
    if (!historyVisibility) {
      await getHistory().then((res) => {
        setHistory(res);
      });
    }
    setHistoryVisibility(!historyVisibility);
  };
  const handleClearHistory = async () => {
    await clearHistory().then((res) => {
      if (res) {
        setHistory([]);
      }
    });
  };
  return (
    <>
      <Spin spinning={isLoading}>
        <History
          onClearHistory={handleClearHistory}
          languages={languages}
          history={history}
          visible={historyVisibility}
          closeHistory={handleHistory}
        ></History>
        <Row justify="start">
          <Col span={1}>
            {" "}
            <Button onClick={handleHistory} type="primary">
              History
            </Button>
          </Col>
          <Col span={1}> </Col>
        </Row>
        <br></br>
        <Row justify="start">
          <Col span={1}> From:</Col>
          <Col span={4}>
            <Select
              style={{
                width: "100%",
              }}
              filterOption={(input, option) =>
                option!.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0 ||
                option!.props.value
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              showSearch
              value={translateState.from}
              onChange={handleFromLanguageChange}
            >
              {languages.map((language) => (
                <Option key={language.code} value={language.code}>
                  {language.name}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        <br></br>

        <Row>
          <Col span={24}>
            <TextArea
              required
              value={translateState.text}
              showCount
              maxLength={5000}
              style={{
                height: 120,
              }}
              onChange={onChange}
            />
          </Col>
        </Row>
        <Row justify="start">
          <Col span={1}> To:</Col>
          <Col span={4}>
            <Select
              style={{
                width: "100%",
              }}
              filterOption={(input, option) =>
                option!.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0 ||
                option!.props.value
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              showSearch
              value={translateState.to}
              onChange={handleToLanguageChange}
            >
              {languages.map((language) => (
                <Option key={language.code} value={language.code}>
                  {language.name}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col span={24}>
            <TextArea
              disabled
              value={response}
              showCount
              style={{
                height: 120,
              }}
              onChange={onChange}
            />
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: "center" }} span={24}>
            <Space>
              <Button onClick={handleTranslate} type="primary">
                Translate
              </Button>
              <Button className="secondary-btn" onClick={handleClear}>
                Clear
              </Button>
            </Space>
          </Col>
        </Row>
      </Spin>
    </>
  );
};
export default Translator;
