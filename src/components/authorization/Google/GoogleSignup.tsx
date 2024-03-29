import { jwtDecode } from "jwt-decode";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const GoogleSignup = () => {
  const navigate = useNavigate();
  const senddata = async (credential: any) => {
    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/google-signup`,
        { data: credential },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { success, authToken } = resp.data;
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
      // Handle errors
      console.log(error);
    }
  };

  return (
    <GoogleOAuthProvider
      clientId={`${import.meta.env.VITE_CLIENT_ID}`}
      //   className="google-signup-btn"
    >
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log("Google Login Success:", credentialResponse);
          const credential = jwtDecode(
            credentialResponse.credential as any
          ) as any;
          senddata(credential);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
      
  );
};

export default GoogleSignup;
