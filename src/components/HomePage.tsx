import React from "react";

import styles from "../styles/App.module.css";

const HomePage: React.FC = () => {
  return (
    <div className={styles.homePage}>
      <h1>Getting Started with Dispute App</h1>
      <p>
        It's an app for practice in React Development. Main idea -
        online-debates. Appearance and interface blocks will be the same as on
        Twitch. Backend code: https://github.com/gsi102/server.git
      </p>

      <h2>Idea</h2>
      <p>
        The app will give you the opportunity to have discussions on the
        Internet with strict rules and boundaries.
      </p>
      <h2>Roles</h2>
      <p>
        There will be four different roles for registered users: admin
        (leader/master for each dispute), participant (person who would have
        side in a discussion), spectator, and moderator (for spectators' chat).
      </p>

      <p>
        Only one role for unregistered user: visitor (spectator who couldn't
        write in the chat).
      </p>
      <h2>Modes</h2>
      <p>
        It could be a way to train your rhetoric skills or a real philosophical
        duel to find where the truth is. There will be different modes. For
        example:
      </p>
      <ul>
        <li>
          Mode with a short text length cap like on Twitter, where you should
          prove your conviction using short messages;
        </li>
        <li>Blitz mode with a one-minute response limit;</li>
        <li>
          Mode with random given theme, where you randomly get your side in a
          dispute and practice in the art of rhetoric (Ex: "What is love?" 1.
          It's an emotionalfeeling 2. It's just a chemical process in the
          brain);
        </li>
        <li>
          "Socrates" mode which allows you to answer the opponent's question
          only with question; ...etc.
        </li>
      </ul>
      <h2>Winner</h2>
      <p>There could be different voting modes:</p>
      <ul>
        <li>Spectators would vote for the winner;</li>
        <li>
          Third-party person (or some persons) would decide who wins; ...etc.
        </li>
      </ul>
      <h2>Encouraging/Rating system</h2>
      <p>
        There could be a rating system where you would get/lose points for each
        dispute you won/lose.
      </p>

      <p>
        P.S. I can come up with a lot of different functions and features, but
        for now the main goal is to practice Development.
      </p>
    </div>
  );
};

export default HomePage;
