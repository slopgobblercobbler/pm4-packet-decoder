import json
import os
import unittest

class TestItMemSemaphore(unittest.TestCase):
    def setUp(self):
        p = os.path.join(os.path.dirname(__file__), '..', 'src', 'pm4_it_mem_semaphore.json')
        with open(p, 'r') as f:
            self.data = json.load(f)

    def test_semaphore(self):
        self.assertEqual(self.data['opcode_id'], "0x39")
        self.assertEqual(self.data['sem_sel_signal'], 0)

if __name__ == '__main__':
    unittest.main()
