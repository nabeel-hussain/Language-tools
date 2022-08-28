import {
  Spin,
  Row,
  Col,
  Button,
  Select,
  Space,
  Input,
  Modal,
  Typography,
  Popover,
  message,
} from "antd";
import { useState, useReducer } from "react";
import { getSpellCheckResult } from "../../../Api/spellcheck";
import { ArrowRightOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;
const { Text, Paragraph } = Typography;

const languages: Language[] = require("../../../Data/languages.json");
const initialState: SpellChecker = {
  lang: "en",
  text: "",
};

const spellCheckerReducer = (state: SpellChecker, action: Action) => {
  switch (action.type) {
    case "text":
      return { ...state, text: action.payload };
    case "lang":
      return { ...state, lang: action.payload };
    case "clear":
      return { lang: "en", text: "" };
    default:
      return state;
  }
};
const SpellChecker = () => {
  const [spellCheckerState, dispatchSpellChecker] = useReducer(
    spellCheckerReducer,
    initialState
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [spellCheckResult, setSpellCheckResult] = useState<
    SpellCheckerResult[]
  >([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onChange = (e: any) => {
    dispatchSpellChecker({ payload: e.target.value, type: "text" });
  };
  const handleFromLanguageChange = (value: string) => {
    dispatchSpellChecker({ payload: value, type: "lang" });
  };
  const handleSpellChecker = async () => {
    setIsLoading(true)
    await getSpellCheckResult(spellCheckerState).then(res=>{   
      setSpellCheckResult(res);
      setIsModalVisible(true);
      setIsLoading(false)

    }).catch(error=>{
      setIsLoading(false)
      message.error("An error has been occured. Please try again.")
    });
    
  };

  const handleOk = () => {
    let result = spellCheckerState.text;
    spellCheckResult.map((word)=>{
      result = result.replaceAll(word.word,word.correctword)
    })
    dispatchSpellChecker({ payload: result, type: "text" });
    setIsModalVisible(false);
    setSpellCheckResult([])
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSpellCheckResult([])

  };
  const getPopoverContent = (mispelled: SpellCheckerResult) => {
    return (
      <>
        <Paragraph>
          <Text type={"warning"}>{mispelled.word} </Text>
          <ArrowRightOutlined/>
          <Text type={"success"}> {mispelled.correctword}</Text>
        </Paragraph>
        <Paragraph>
          <Text>Other Suggestions: </Text>
          {
            mispelled.candidates.map((word,index)=>(
              <Text> {word} {mispelled.candidates.length-1>index&&","}</Text>
            ))

          }
        </Paragraph>
      </>
    );
  };
  const handleClear = () =>{
    dispatchSpellChecker({type:"clear",payload:""})
  }
  return (
    <>
      <Spin spinning={isLoading}>
        <Modal
          title="Spell Checker Result"
          visible={isModalVisible}
          okText={"Auto Correct"}
          onOk={handleOk}
          onCancel={handleCancel}
          width={700}
        >
          {spellCheckerState.text.split("\n").map((para) => {
            return (
              <Paragraph>
                {para.split(" ").map((word) => {
                  let mispelled = spellCheckResult.find((x) => x.word === word);
                  return mispelled ? (
                    <Popover
                    overlayStyle={{
                      width: "20vw"
                    }}
                      placement="bottomRight"
                      title="Test"
                      content={getPopoverContent(mispelled)}
                    >
                      <Text type={"warning"}>{word} </Text>
                    </Popover>
                  ) : (
                    <Text>{word} </Text>
                  );
                })}
              </Paragraph>
            );
          })}
        </Modal>
        <Row>
          <Col span={3}> Language:</Col>
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
              value={spellCheckerState.lang}
              onChange={handleFromLanguageChange}
            >
              {languages.map((language) => {
                if (
                  language.code === "en" ||
                  language.code === "es" ||
                  language.code === "fr" ||
                  language.code === "de"
                )
                  return (
                    <Option key={language.code} value={language.code}>
                      {language.name}
                    </Option>
                  );
              })}
            </Select>
          </Col>
        </Row>
        <br></br>

        <Row>
          <Col span={24}>
            <TextArea
              spellCheck={true}
              required
              value={spellCheckerState.text}
              showCount
              maxLength={5000}
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
              <Button onClick={handleSpellChecker} type="primary">
                Check Spelling
              </Button>
              <Button
                className="secondary-btn"   onClick={handleClear}
              >
                Clear
              </Button>
            </Space>
          </Col>
        </Row>
      </Spin>
    </>
  );
};
export default SpellChecker;
