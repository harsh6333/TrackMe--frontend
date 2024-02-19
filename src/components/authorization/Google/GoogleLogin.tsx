// import other necessary imports
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const GoogleLoginComponent: React.FC = () => {
  const navigate = useNavigate();
  const senddata = async (credential: any) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/google-login`,
        {
          data: credential,
        }
      );
      const { success, authToken } = response.data;

      if (!success) {
        alert("Enter valid Credentials");
      } else {
        // Store the token in localStorage
        localStorage.setItem("authToken", authToken);

        // Set the default "Authorization" header for Axios
        axios.defaults.headers.common["Authorization"] = `${authToken}`;
        // Redirect to the homepage
        navigate("/todo");
        window.location.reload();
      }
    } catch (error) {
      console.log("Error logging in");
    }
  };

  return (
    <GoogleOAuthProvider clientId={`${import.meta.env.VITE_CLIENT_ID}`}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const credential = jwtDecode(credentialResponse.credential as any);
          senddata(credential);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
