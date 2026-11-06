import json
import os
import unittest

class TestPm4DispatchTaskMesh(unittest.TestCase):
    def setUp(self):
        p = os.path.join(os.path.dirname(__file__), '..', 'src', 'pm4_it_dispatch_taskmesh_multi.json')
        with open(p, 'r') as f:
            self.data = json.load(f)

    def test_taskmesh(self):
        self.assertEqual(self.data['opcode'], 0x30)
        self.assertEqual(self.data['name'], 'IT_DISPATCH_TASKMESH_INDIRECT_MULTI')

if __name__ == '__main__':
    unittest.main()
