#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItDrawIndexIndirectCountOffsetDef {
    static constexpr std::uint8_t opcode = 0x31;
    static constexpr std::string_view name = "IT_DRAW_INDEX_INDIRECT_COUNT_OFFSET";
    static constexpr std::string_view desc = "Indirect indexed draw with offset count buffer fetch";
};
}
