import { authKey } from "@/constants/authKey";
import deleteCookies from "@/services/actions/deleteCookies";
import logoutUser from "@/services/actions/logoutUser";
import { getUserInfo, removeUser } from "@/services/auth.services";
import { Button } from "@mui/material";
import { cookies } from "next/headers";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthButton = () => {
    const userInfo = getUserInfo();
    const router = useRouter();

    const handleLogout = () => {
        // removeUser();
        // localStorage.removeItem(authKey);
        // deleteCookies([authKey, "refreshToken"]);
        // router.push("/");
        // router.refresh();
        logoutUser(router);
    };

    return (
        <>
            {userInfo?.email ? (
                <Button onClick={handleLogout} color="error">
                    Logout
                </Button>
            ) : (
                <Button component={Link} href="/login">
                    Login
                </Button>
            )}
        </>
    );
};

export default AuthButton;
