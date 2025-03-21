export async function register(previousState, formData) {
    try {
        const email = formData.get("email");
        const password = formData.get("password");

        const res = await fetch("http://localhost:3000/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            return { ...previousState, error: data?.error || "Registration failed" };
        }

        return { error: null, success: "Registration successful"  };
    } catch (error) {
        return { ...previousState, error: "Something went wrong" };
    }
}

export async function login(previousState, formData) {
    try {
        const email = formData.get("email");
        const password = formData.get("password");

        const res = await fetch("http://localhost:3000/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            return { ...previousState, error: data?.error || "Registration failed" };
        }

        return { error: null, success: data };
    } catch (error) {
        return { ...previousState, error: "Something went wrong" };
    }
}
