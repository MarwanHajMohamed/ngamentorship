import "./team.css";
import { useAuth } from "../../../../hooks/useAuth";
import { useGroup } from "../../../../hooks/useGroup";

const Team = () => {
  const { user } = useAuth();
  const { loading, mentees, error } = useGroup(user?.group._id);

  if (loading) return <p>Loading team...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div className="teams-container">
      <div className="title">Team</div>

      <table className="team-table">
        <thead>
          <tr>
            <td></td>
            {mentees.map((mentee) => (
              <td key={mentee._id}>{mentee.firstName}</td>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Research</td>
            {mentees.map((mentee) => (
              <td key={mentee._id}>
                <div className="complete"></div>
              </td>
            ))}
          </tr>

          <tr>
            <td>Training</td>
            {mentees.map((mentee) => (
              <td key={mentee._id}>3/5</td>
            ))}
          </tr>

          <tr>
            <td>Quiz</td>
            {mentees.map((mentee) => (
              <td key={mentee._id}>
                <div className="complete"></div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Team;
