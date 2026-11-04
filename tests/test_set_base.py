import json
import os
import unittest

class TestSetBase(unittest.TestCase):
    def setUp(self):
        p = os.path.join(os.path.dirname(__file__), '..', 'src', 'pm4_set_base.json')
        with open(p, 'r') as f:
            self.data = json.load(f)

    def test_bases(self):
        self.assertEqual(self.data['IT_SET_BASE'], 0x34)
        self.assertEqual(self.data['BASE_SEL_PATCH_BUFFER'], 0)

if __name__ == '__main__':
    unittest.main()
