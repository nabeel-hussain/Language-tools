import { Typography, Collapse } from "antd";
import PageContainer from "../../components/Layout/PageContainer";
const { Text, Paragraph } = Typography;
const { Panel } = Collapse;

const Home = () => {
  return (
    <>
      <PageContainer title="Dashboard">
        <Paragraph>
          <Text>
            Language tools contains the set of language tools that can be
            helpful in writing content and improving your content.
          </Text>
          <Text>
            It contains the language translation tool that contains more than 30
            langauges to translate from one language to the other.
          </Text>
        </Paragraph>
        <Paragraph>
          <Text>
            The basic purpose of the LT is to help the content creators so that
            they can do better content writing and make their content
            attractful.
          </Text>
          <Text>
            Right now, LT contains two major tools named Spell Checker and
            Language translation.
          </Text>
        </Paragraph>
        <br></br>
        <Collapse accordion>
          <Panel header="Language Translation" key="1">
            <p>
              LT's free service instantly translates words, phrases, between
              English and over 30 other languages.{" "}
            </p>
            <p>
              It also maintains the history of translated words or phrases so
              that user can easily copy paste again from history whenever they
              want.{" "}
            </p>
            <p>
              User have the ability to copy and paste the input and output text
              anywhere.{" "}
            </p>
            <p>
              LT is using the Python AI based library to translate the one
              language to the other.{" "}
            </p>
            <p>
              If anyone wants to buy the API endpoint then LT can also provide
              the subscription to that as well.{" "}
            </p>
          </Panel>
          <Panel header="Spell Checker" key="2">
            <p>
              {" "}
              Spell checker is used to check the spelling for the English
              language and some other languages. It is using the AI based
              library to check for misspeeled words and then show the possible
              suggestions for each of the word.
            </p>
            <p>
              Spell checker also have the feature to auto correct the paragraph or single word written by the user. 
            </p>
            <p>
              Spell checker shows all possible words for each mispelled word so that user can have better idea. 
            </p>
          </Panel>
        </Collapse>
      </PageContainer>
    </>
  );
};
export default Home;
