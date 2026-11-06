import json
import os
import unittest

class TestPm4DispatchMeshMulti(unittest.TestCase):
    def setUp(self):
        p = os.path.join(os.path.dirname(__file__), '..', 'src', 'pm4_it_dispatch_mesh_multi.json')
        with open(p, 'r') as f:
            self.data = json.load(f)

    def test_mesh_multi(self):
        self.assertEqual(self.data['opcode'], 0x2F)
        self.assertEqual(self.data['name'], 'IT_DISPATCH_MESH_INDIRECT_MULTI')

if __name__ == '__main__':
    unittest.main()
