import json
import os
import unittest

class TestPm4CondExec(unittest.TestCase):
    def setUp(self):
        p = os.path.join(os.path.dirname(__file__), '..', 'src', 'pm4_it_cond_exec.json')
        with open(p, 'r') as f:
            self.data = json.load(f)

    def test_cond_spec(self):
        self.assertEqual(self.data['opcode'], 0x44)
        self.assertEqual(self.data['name'], 'IT_COND_EXEC')

if __name__ == '__main__':
    unittest.main()
