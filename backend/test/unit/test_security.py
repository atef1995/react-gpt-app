import unittest
from unittest.mock import Mock, patch
from core.security import get_token_from_cookie
from core.logger import Logger
from fastapi import Request, HTTPException


class TestGetTokenFromCookie(unittest.TestCase):
    @patch("core.logger")
    def test_successful_token_extraction(self, mock_logger):
        mock_request = Mock()
        mock_request.cookies.get.return_value = "some_valid_token"

        token = get_token_from_cookie(mock_request)

        self.assertEqual(token, "some_valid_token")
        mock_logger.error.assert_not_called()

    @patch("core.logger")
    def test_missing_token(self, mock_logger):
        mock_request = Mock()
        mock_request.cookies.get.return_value = None

        with self.assertRaises(HTTPException) as context:
            get_token_from_cookie(mock_request)

        self.assertEqual(context.exception.status_code, 401)
        mock_logger.error.assert_not_called()

    @patch("core.logger")
    def test_random_exception(self, mock_logger):
        mock_request = Mock()
        mock_request.cookies.get.side_effect = Exception("Some random exception")

        with self.assertRaises(Exception):
            get_token_from_cookie(mock_request)

        mock_logger.error.assert_called_with(
            "An error occurred: function: get_token_from_cookie", exc_info=1
        )


if __name__ == "__main__":
    unittest.main()
