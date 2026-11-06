#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItDrawIndirectDef {
    static constexpr std::uint8_t opcode = 0x24;
    static constexpr std::string_view name = "IT_DRAW_INDIRECT";
    static constexpr std::string_view desc = "Indirect non-indexed draw sourcing parameters from GPU buffer";
};
}
