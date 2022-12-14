import { Col, message, Row, Select, Input, Button, Space, Spin } from "antd";
import { useReducer, useState } from "react";
import { translate } from "../../../../Api/translate";
import { clearHistory, getHistory } from "../../../../Api/history";
import History from "../History";
import { CopyOutlined } from "@ant-design/icons";
import { copyToClipBoard } from "../../../../Utilities/Global";
const { Option } = Select;
const { TextArea } = Input;
const languages: Language[] = require("../../../../Data/languages.json");
//Initializing the translation state.
//Setting default languages to English and text empty
const initialState: Translate = {
  to: "en",
  from: "en",
  text: "",
};
//Reducer to manage the translate state
const translateReducer = (state: Translate, action: Action) => {
  switch (action.type) {
    case "text":
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
  const [alertMessage, setAlertMessage] = useState(
    "An error has been occured. Please try again"
  );
  const onChange = (e: any) => {
    dispatchTranslate({ type: "text", payload: e.target.value });
  };
  const handleFromLanguageChange = (value: string) => {
    dispatchTranslate({ type: "from", payload: value });
  };
  const handleToLanguageChange = (value: string) => {
    dispatchTranslate({ type: "to", payload: value });
  };
  //Function to handle the translate button
  //It sends the call to flask server and get the translated content
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
    await translate(translateState)
      .then((res) => {
        setResponse(res);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        message.error(alertMessage);
      });
  };
  const handleClear = async () => {
    dispatchTranslate({ type: "clear", payload: "" });
    setResponse("");
  };
  //This function get the history from flask server or local storage in case of live site. 
  //It set the drawer to be opened so that user can see the history in separate drawer on the right side. 
  const handleHistory = async () => {
    if (!historyVisibility) {
      await getHistory()
        .then((res) => {
          setHistory(res);
        })
        .catch((err) => {
          message.error(alertMessage);
        });
    }
    setHistoryVisibility(!historyVisibility);
  };
  const handleClearHistory = async () => {
    await clearHistory()
      .then((res) => {
        if (res) {
          setHistory([]);
        }
      })
      .catch((error) => {
        message.error(alertMessage);
      });
  };
  const handleCopy = (text: string) => {
    copyToClipBoard(
      text === "inputText" && translateState.text !== ""
        ? translateState.text
        : response !== ""
        ? response
        : ""
    );
    message.success("Copied");
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
          <Col span={2}> From:</Col>
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
        <Col span={24}>
          {" "}
          <CopyOutlined
            style={{ float: "right" }}
            onClick={(e) => handleCopy("inputText")}
          />
        </Col>

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
            >
              <span>test</span>
            </TextArea>
          </Col>
        </Row>
        <Row justify="start">
          <Col span={2}> To:</Col>
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
        <Col span={24}>
          {" "}
          <CopyOutlined
            style={{ float: "right" }}
            onClick={(e) => handleCopy("outputText")}
          />
        </Col>
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
