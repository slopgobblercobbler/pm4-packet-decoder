import json
import os
import unittest

class TestPm4EventWrite(unittest.TestCase):
    def setUp(self):
        p = os.path.join(os.path.dirname(__file__), '..', 'src', 'pm4_it_event_write.json')
        with open(p, 'r') as f:
            self.data = json.load(f)

    def test_event_write(self):
        self.assertEqual(self.data['opcode'], "IT_EVENT_WRITE")
        self.assertEqual(self.data['event_type_cache_flush'], 2)

if __name__ == '__main__':
    unittest.main()
