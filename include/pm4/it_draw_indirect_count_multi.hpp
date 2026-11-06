#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItDrawIndirectCountMultiDef {
    static constexpr std::uint8_t opcode = 0x2e;
    static constexpr std::string_view name = "IT_DRAW_INDIRECT_COUNT_MULTI";
    static constexpr std::string_view desc = "Multi-draw non-indexed with indirect count buffer dispatch";
};
}
