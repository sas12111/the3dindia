import { useEffect } from 'react';
import { apiUrl } from '../utils/api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export function GitHubCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleGitHubCallback = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const storedState = sessionStorage.getItem('github_oauth_state');

        if (!code) {
          throw new Error('No authorization code received from GitHub');
        }

        if (state !== storedState) {
          throw new Error('State mismatch - possible CSRF attack');
        }

        sessionStorage.removeItem('github_oauth_state');

        // Exchange code for token on backend
        const tokenResponse = await fetch(apiUrl('/api/auth/github/token'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        });

        if (!tokenResponse.ok) {
          const error = await tokenResponse.json();
          throw new Error(error.error || 'Failed to get GitHub token');
        }

        const { access_token } = await tokenResponse.json();

        // Get user info from GitHub
        const userResponse = await fetch('https://api.github.com/user', {
          headers: { Authorization: `Bearer ${access_token}` },
        });

        if (!userResponse.ok) {
          throw new Error('Failed to fetch GitHub user info');
        }

        const githubUser = await userResponse.json();

        // Get user email if not public
        let email = githubUser.email;
        if (!email) {
          const emailResponse = await fetch('https://api.github.com/user/emails', {
            headers: { Authorization: `Bearer ${access_token}` },
          });
          if (emailResponse.ok) {
            const emails = await emailResponse.json();
            const primaryEmail = emails.find((e: any) => e.primary);
            email = primaryEmail?.email || emails[0]?.email;
          }
        }

        if (!email) {
          throw new Error('Could not retrieve email from GitHub account');
        }

        // Send to backend for login/register
        const loginResponse = await fetch(apiUrl('/api/auth/github'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            name: githubUser.name || githubUser.login,
            login: githubUser.login,
            avatar_url: githubUser.avatar_url,
          }),
        });

        const loginData = await loginResponse.json();

        if (loginData.success) {
          localStorage.setItem('token', loginData.token);
          navigate('/my-orders', { replace: true });
        } else {
          throw new Error(loginData.error || 'Login failed');
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : 'GitHub login failed';
        sessionStorage.setItem('github_error', message);
        navigate('/login', { replace: true });
      }
    };

    handleGitHubCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Processing GitHub login...</p>
      </div>
    </div>
  );
}
