import { TSChatEngine } from "./utilities/index";
import ChatFeed from "./components/ChatFeed";
import LoginForm from "./components/LoginForm";

function App() {
  if (!localStorage.getItem("username")) return <LoginForm />;

  return (
    <TSChatEngine
      height="100vh"
      projectID="280b36f4-441c-4697-a7fe-c5e224ba9540"
      userName={localStorage.getItem("username")}
      userSecret={localStorage.getItem("password")}
      renderChatFeed={(props: any) => <ChatFeed {...props} />}
    />
  );
}

export default App;
