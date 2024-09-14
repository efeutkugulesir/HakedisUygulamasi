// AuthService.ts
class AuthService {
    private role: string | null = null;

    setRole(role: string) {
        this.role = role;
    }

    getRole(): string | null {
        return this.role;
    }

    isAuthenticated(): boolean {
        return this.role !== null;
    }
}

export default new AuthService();
