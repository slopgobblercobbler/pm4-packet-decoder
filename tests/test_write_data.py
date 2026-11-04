import json
import os
import unittest

class TestWriteData(unittest.TestCase):
    def setUp(self):
        p = os.path.join(os.path.dirname(__file__), '..', 'src', 'pm4_write_data.json')
        with open(p, 'r') as f:
            self.data = json.load(f)

    def test_write_data(self):
        self.assertEqual(self.data['IT_WRITE_DATA'], 0x37)
        self.assertEqual(self.data['DST_SEL_REG'], 2)

if __name__ == '__main__':
    unittest.main()
