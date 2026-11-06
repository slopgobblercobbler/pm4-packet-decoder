#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItDispatchIndirectDef {
    static constexpr std::uint8_t opcode = 0x16;
    static constexpr std::string_view name = "IT_DISPATCH_INDIRECT";
    static constexpr std::string_view desc = "Indirect compute shader execution dispatch sourced from memory buffer";
};
}
