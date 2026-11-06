#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItDrawIndirectCountOffsetDef {
    static constexpr std::uint8_t opcode = 0x30;
    static constexpr std::string_view name = "IT_DRAW_INDIRECT_COUNT_OFFSET";
    static constexpr std::string_view desc = "Indirect non-indexed draw with offset count buffer fetch";
};
}
